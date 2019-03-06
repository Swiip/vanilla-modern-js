const init = async () => {
  try {
    const { instance } = await WebAssembly.instantiateStreaming(
      fetch("/rust/debug/2048.wasm"),
      {}
    );

    console.log("WebAssembly instantiate success", instance, instance.exports);
    return instance;
  } catch (e) {
    console.log("error", e);
    throw e;
  }
};
