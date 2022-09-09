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

  function refreshForm() {
    serverSuccess = false;
    serverError = false;
    reset();
  }
</script>

<svelte:head>
  <title>Solid</title>
</svelte:head>

<div class="container">
  <div class="square-container">
    <div class="square uno">
      <img
        src="/logo-solid.svg"
        alt="The colorful Logo Solid (temporary)"
        width="200"
      />
    </div>

    <div class="square duo">
      <h2 class="body">
        A revolutionnary decentralized content publishing platform.
      </h2>
    </div>
    <div class="square trio">
      {#if !serverError && !serverSuccess}
        <p class="body mb-3">
          Get notified by email <br />and join the beta program 👇
        </p>
        <form
          use:form
          action="/api/save-email"
          method="post"
          class="flex gap-x-2"
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
            >🚀</button
          >
        </form>
      {/if}

      {#if $errors.email}
        <p class="text-sm md:text-base mt-3 error">
          This is not a valid email address.
        </p>
      {:else}
        {#if serverError}
          <p class="text-sm md:text-base error">
            An error occurred while submitting your email address. <a
              href="/"
              style="text-decoration: underline;"
              on:click|preventDefault={refreshForm}>Please, try again</a
            >
          </p>
        {/if}
        {#if serverSuccess}
          <h2 class="thankyou">Thank you! <br />We&apos;ll be in touch 🚀</h2>
        {/if}
      {/if}
    </div>
  </div>

  <footer>
    <a href="https://0x3.studio">
      <img
        src="/logo-0x3-studio.svg"
        width="134"
        alt="The beautiful and now famous logo of 0X3 studio"
      /></a
    >
  </footer>
</div>

<style>
  button {
    background: linear-gradient(180deg, #924aee 0%, #ad1fc4 100%);
  }

  input,
  input:focus {
    background-color: #1a1a1a1e;
    color: #fff;
    border: 0px;
  }

  footer {
    position: absolute;
    bottom: var(--padding-layout);
    right: var(--padding-layout);
  }
  .container {
    display: flex;

    height: 100%;
    align-items: center;
  }
  .body {
    font-size: 1.8em;
    line-height: 1em;
    font-weight: 600;
  }

  .square-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: var(--padding-layout);
    gap: 1rem;
  }

  .square {
    height: 300px;
    width: 300px;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .thankyou {
    font-size: 2.5em;
    line-height: 1em;
    font-weight: 600;
  }
  .uno {
    background: #1e2b46;
    box-shadow: 0px 94px 64px -40px rgba(170, 40, 22, 0.3);
  }
  .duo {
    background: #fa684e;
    align-items: flex-end;
    justify-content: flex-start;
    width: 250px;
    box-shadow: 0px 84px 64px -20px #d15ea4;
  }

  .trio {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    width: 450px;
    background: linear-gradient(119.7deg, #dd87ee -24.5%, #ad1fc4 153.97%),
      #1e2b46;
    box-shadow: 0px 65px 64px -20px rgba(115, 23, 79, 0.3);
  }
  :root {
    --font-size-h2: 2em;
    --padding-layout: 5rem;
    --max-width: 680px;
  }

  .error {
    color: rgba(12, 32, 73, 1);
    font-weight: 600;
  }

  @media (max-width: 768px) {
    footer {
      padding-bottom: 2rem;
      position: unset;
      top: unset;
      bottom: unset;
    }
    .container {
      flex-direction: column;
    }
    .uno,
    .duo,
    .trio {
      width: 100%;
    }
    :root {
      --font-size-h2: 1.5em;
      --padding-layout: 1.5rem;
      --max-width: 100%;
    }
  }
</style>
