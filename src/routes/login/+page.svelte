<script>
  import AuthCard from '$lib/components/AuthCard.svelte';
  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  let email = '';
  let password = '';
  let message = '';
  let loading = false;

  onMount(async () => {
    if (!browser) return;
    const { data } = await supabase.auth.getUser();
    if (data?.user) goto('/tasks');
  });

  async function login() {
    loading = true;
    message = "";
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) message = error.message;
    else goto('/tasks');

    loading = false;
  }
</script>

<AuthCard>
  <h2 class="text-3xl font-bold text-center mb-4">Welcome Back</h2>

  <label class="form-control mb-3">
    <span class="label-text">Email</span>
    <input class="input input-bordered w-full" type="email" bind:value={email} />
  </label>

  <label class="form-control mb-4">
    <span class="label-text">Password</span>
    <input class="input input-bordered w-full" type="password" bind:value={password} />
  </label>

  <button class="btn btn-primary w-full mb-3" on:click={login}>
    {loading ? "Logging in…" : "Login"}
  </button>

  {#if message}
    <p class="text-center text-error">{message}</p>
  {/if}

  <p class="text-center mt-4 text-sm">
    New here? <a class="link link-primary" href="/signup">Create an account</a>
  </p>
</AuthCard>
