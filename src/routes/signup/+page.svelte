<script>
  import AuthCard from '$lib/components/AuthCard.svelte';
  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let message = '';
  let loading = false;

  async function signup() {
    loading = true; message = '';
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) message = error.message;
    else {
      message = 'Check your email to confirm the account.';
      setTimeout(() => goto('/login'), 1400);
    }
    loading = false;
  }
</script>

<AuthCard>
  <h2 class="text-3xl font-bold text-center">Create Account</h2>

  <div class="space-y-4 mt-2">
    <label class="form-control">
      <span class="label-text">Email</span>
      <input class="input input-bordered w-full" type="email" bind:value={email} />
    </label>

    <label class="form-control">
      <span class="label-text">Password</span>
      <input class="input input-bordered w-full" type="password" bind:value={password} />
    </label>

    <button class="btn btn-primary w-full mt-2" on:click={signup} disabled={loading}>
      {loading ? 'Creating…' : 'Sign Up'}
    </button>

    {#if message}
      <p class="text-center text-info mt-3">{message}</p>
    {/if}

    <p class="text-center text-sm mt-4">
      Already have an account? <a class="link link-primary" href="/login">Login</a>
    </p>
  </div>
</AuthCard>
