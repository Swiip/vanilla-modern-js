// ❤️ https://www.hellorust.com/

const newStringInMemory = (instance, str) => {
  const utf8Encoder = new TextEncoder("UTF-8");
  const string_buffer = utf8Encoder.encode(str);
  const len = string_buffer.length;
  const ptr = instance.exports.alloc(len + 1);

  const memory = new Uint8Array(instance.exports.memory.buffer);
  for (let i = 0; i < len; i++) {
    memory[ptr + i] = string_buffer[i];
  }

  memory[ptr + len] = 0;

  return ptr;
};

const copyStringFromMemory = (instance, ptr) => {
  const orig_ptr = ptr;

  const collectString = function*() {
    let memory = new Uint8Array(instance.exports.memory.buffer);
    while (memory[ptr] !== 0) {
      if (memory[ptr] === undefined) {
        throw new Error("Tried to read undef mem");
      }
      yield memory[ptr];
      ptr += 1;
    }
  };

  const buffer_as_u8 = new Uint8Array(collectString());
  const utf8Decoder = new TextDecoder("UTF-8");
  const buffer_as_utf8 = utf8Decoder.decode(buffer_as_u8);
  instance.exports.dealloc_str(orig_ptr);
  return buffer_as_utf8;
};

const wrap = (instance, name) => input => {
  const inputString = JSON.stringify(input);
  const inputPointer = newStringInMemory(instance, inputString);
  const outputPointer = instance.exports[name](inputPointer);
  const outputString = copyStringFromMemory(instance, outputPointer);
  instance.exports.dealloc_str(inputPointer);
  return JSON.parse(outputString);
};
