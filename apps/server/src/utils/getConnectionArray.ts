type Args = Array<{ typename: string; id: string }> | null | undefined;

// We use this function to map the global ids and return an array of ids.
const getConnectionArray = (arr: Args): Array<{ id: string }> | undefined => {
  if (!arr) {
    return undefined;
  }

  return arr.map((item) => ({ id: item.id }));
};

export default getConnectionArray;
