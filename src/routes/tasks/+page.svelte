<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';

  let tasks = [];
  let loading = true;

  async function loadTasks() {
    loading = true;
    const { data: u } = await supabase.auth.getUser();
    const userId = u?.user?.id;
    if (!userId) { goto('/login'); return; }

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (!error) tasks = data ?? [];
    loading = false;
  }

  onMount(loadTasks);

  async function toggleComplete(t) {
    const newStatus = t.status === 'Completed' ? 'Pending' : 'Completed';
    await supabase.from('tasks').update({ status: newStatus }).eq('id', t.id);
    await loadTasks();
  }

  async function deleteTask(id) {
    if (!confirm('Delete?')) return;
    await supabase.from('tasks').delete().eq('id', id);
    await loadTasks();
  }
</script>

<div class="p-6">
  <div class="flex items-center mb-6">
    <h1 class="text-3xl font-bold">Your Tasks</h1>
    <button class="btn btn-primary btn-sm ml-auto" on:click={() => goto('/tasks/new')}>Add Task</button>
  </div>

  {#if loading}
    <p>Loading tasks…</p>
  {:else if tasks.length === 0}
    <p>No tasks yet — click Add Task.</p>
  {:else}
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {#each tasks as t}
        <div class="card bg-base-100 shadow p-4">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-xl font-bold">{t.title}</h3>
              <p class="text-sm text-muted">{t.description}</p>
              <p class="mt-2 text-sm">Due: {t.due_date || '—'}</p>
            </div>

            <div class="flex flex-col items-end gap-2">
              <span class="badge">{t.status}</span>
              <span class="badge badge-outline">{t.priority}</span>
              <div class="flex gap-2 mt-2">
                <button class="btn btn-xs" on:click={() => toggleComplete(t)}>
                  {t.status === 'Completed' ? 'Mark Pending' : 'Complete'}
                </button>
                <button class="btn btn-xs btn-error" on:click={() => deleteTask(t.id)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
