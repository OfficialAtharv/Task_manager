<script>
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';

  if (browser) {
    goto('/tasks', { replaceState: true });
  }
</script>

<p>Redirecting…</p>
