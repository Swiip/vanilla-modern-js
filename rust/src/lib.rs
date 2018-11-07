extern crate serde;
extern crate serde_json;

#[macro_use]
extern crate serde_derive;

use std::mem;
use std::ffi::{CString, CStr};
use std::os::raw::{c_char, c_void};

mod tile;
mod board;
mod add;
mod move_tile;
mod state;

use state::ReducerArguments;

const DIMENSION: usize = 4;
const FOOR_PROBABILITY: f32 = 0.2;

#[no_mangle]
pub extern "C" fn alloc(size: usize) -> *mut c_void {
    let mut buf = Vec::with_capacity(size);
    let ptr = buf.as_mut_ptr();
    mem::forget(buf);
    return ptr as *mut c_void;
}

#[no_mangle]
pub extern "C" fn dealloc(ptr: *mut c_void, cap: usize) {
    unsafe  {
        let _buf = Vec::from_raw_parts(ptr, 0, cap);
    }
}

#[no_mangle]
pub extern "C" fn dealloc_str(ptr: *mut c_char) {
    unsafe {
        let _ = CString::from_raw(ptr);
    }
}

#[no_mangle]
    pub extern "C" fn reducer(args: *mut c_char) -> *mut c_char {
    unsafe {
        let args_in_json = CStr::from_ptr(args)
            .to_str()
            .expect("Reducer argument should be a String")
            .to_owned();

        let args: ReducerArguments = serde_json::from_str(&args_in_json)
            .expect("Reducer String argument should be JSON containing {state, action}");

        let new_state = state::reducer(args.state, args.action);

        let result = serde_json::to_string(&new_state)
            .expect("Stringify failed for resulting state");

        CString::new(result)
            .expect("Converting result to CString failed")
            .into_raw()

        // let data = CStr::from_ptr(data);
        // let mut data = data.to_str().unwrap().to_owned();
        // data.push_str("Hello");
        // CString::new(data.into_bytes()).unwrap().into_raw()

        // m.update(data.to_bytes());
        // let dgst = m.digest().to_string();
        // let s = CString::new(dgst).unwrap();
        // s.into_raw()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn reducer_works() {
        unsafe {
            let args = "{
                \"state\":{\"board\":{\"current_id\":0,\"grid\":[]},\"changed\":false,\"won\":false,\"lost\":false},
                \"action\":{\"action_type\":\"Init\",\"direction\":null,\"random_value\":null,\"random_position\":null}
            }";
            let args_ptr = CString::new(args).unwrap().into_raw();
            let result_ptr = reducer(args_ptr);
            let result = CStr::from_ptr(result_ptr).to_str().unwrap().to_owned();
            assert!(result.contains("current_id"));
        }
    }
}
