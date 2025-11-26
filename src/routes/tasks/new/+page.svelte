<script>
  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let title = '';
  let description = '';
  let priority = 'Low';
  let due_date = '';
  let message = '';
  let loading = false;
  let userId = null;

  onMount(async () => {
    const { data } = await supabase.auth.getUser();
    userId = data?.user?.id;
    if (!userId) goto('/login');
  });

  async function addTask() {
    message = '';
    loading = true;
    if (!title.trim()) { message = 'Title required'; loading = false; return; }

    const { error } = await supabase.from('tasks').insert({
      user_id: userId, title, description, priority, due_date, status: 'Pending'
    });

    if (error) message = error.message;
    else goto('/tasks');

    loading = false;
  }
</script>

<div class="min-h-screen flex justify-center items-start p-8 bg-base-200">
  <div class="card w-full max-w-lg bg-base-100 shadow p-6">
    <h2 class="text-3xl font-bold mb-4 text-center">Add New Task</h2>
    <input class="input input-bordered w-full mb-3" placeholder="Title" bind:value={title} />
    <textarea class="textarea textarea-bordered w-full mb-3" placeholder="Description" bind:value={description}></textarea>
    <select class="select select-bordered w-full mb-3" bind:value={priority}>
      <option>Low</option><option>Medium</option><option>High</option>
    </select>
    <input type="date" class="input input-bordered w-full mb-3" bind:value={due_date} />
    <button class="btn btn-primary w-full" on:click={addTask} disabled={loading}>{loading ? 'Saving...' : 'Save Task'}</button>
    {#if message}<p class="text-center text-error mt-3">{message}</p>{/if}
  </div>
</div>
