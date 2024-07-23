export const LoadUpLocalStorage = (key) => {
  try {
    const savedData = JSON.parse(localStorage.getItem(key));
    return savedData ? savedData : null;
  } catch (err) {
    console.log(err);
  }
};

export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const restoreFromBin = (index, bin, restored) => {
  const tempbinArray = [...bin];
  let restoredItem = [];
  index
    .sort((a, b) => b - a)
    .forEach((i) => {
      restoredItem.push(tempbinArray.splice(i, 1)[0]);
    });
  return { bin: tempbinArray, restored: [...restoredItem, ...restored] };
};

export const addToBin = (item, bin) => {
  return [item, ...bin];
};

export const deleteFromBin = (index, bin) => {
  if (index.length === 1) {
    const newBin = bin.filter((_, i) => i !== index[0]);
    return newBin;
  } else {
    index.sort((a, b) => b - a);
    let tempBinArray = [...bin];
    index.forEach((i) => {
      tempBinArray.splice(i, 1);
    });
    return tempBinArray;
  }
};
