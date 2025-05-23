export const existsFile = async (path) => {
  try {
    const stat = await Deno.stat(path);
    return stat.isFile;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return false;
    } else {
      throw error; // 他のエラーは再スロー
    }
  }
};
