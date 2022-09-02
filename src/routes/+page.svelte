<script>
  import { createForm } from "felte";
  import { validator } from "@felte/validator-yup";

  import schema from "../schemas/email";

  let serverSuccess = false;
  let serverError = false;

  const { form, errors, isValid, reset } = createForm({
    onSuccess() {
      reset();
      serverError = false;
      serverSuccess = true;
    },
    onError() {
      serverError = true;
      serverSuccess = false;
    },
    extend: validator({ schema }),
  });
</script>

<svelte:head>
  <title>Solid</title>
</svelte:head>

<div class="flex flex-col justify-center items-center h-full px-20">
  <h1
    class="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight leading-none mb-5 text-center"
  >
    Solid
  </h1>

  <h2 class="text-xl md:text-2xl leading-tight mb-5  text-center">
    A decentralized content publishing platform.
  </h2>

  {#if !serverError && !serverSuccess}
    <p class="text-sm md:text-base mb-5 text-center">
      Leave your email address below so you can be alerted when we're ready.
    </p>
    <form
      use:form
      action="/api/save-email"
      method="post"
      class="flex mb-5 gap-x-2"
    >
      <input
        type="text"
        name="email"
        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      />
      <button
        type="submit"
        disabled={!$isValid}
        class="shadow bg-blue-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded disabled:pointer-events-none disabled:opacity-50"
        >Save</button
      >
    </form>
  {/if}

  {#if $errors.email}
    <p class="text-sm md:text-base text-center text-red-700">
      This is not a valid email address.
    </p>
  {:else}
    {#if serverError}
      <p class="text-sm md:text-base text-center text-red-700">
        An error occurred while submitting your email address. Please refresh
        the page and try again.
      </p>
    {/if}
    {#if serverSuccess}
      <p class="text-sm md:text-base text-center text-green-700">
        Thank you! We&apos;ll be in touch as soon as we&apos;re ready.
      </p>
    {/if}
  {/if}
</div>
