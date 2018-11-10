pub fn times<F>(times: usize, mut f: F) where F: FnMut() {
    for _ in 0..times {
        f();
    }
}
