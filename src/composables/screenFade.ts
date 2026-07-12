function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useScreenFade() {
  async function fade(action: () => unknown | Promise<unknown>) {
    isScreenFading.value = true;

    await sleep(450);

    await action();

    await sleep(100);

    isScreenFading.value = false;
  }

  return {
    isScreenFading,
    fade,
  };
}