const defaultOpts = {
  // all of these descriptions are for what happens if you set the
  // values to true.
  hardFail: false,
  // will error if there's something unexpected.
  // otherwise, the code just tries to deal with it.
  complex: true,
  // compute complex characters
  complex3: false,
  // allows operation on complex characters composed of three base characters.
  // this means you can make things like "ㅩ", "ㅫ", "ㅴ", and "ㅵ".
  // since these characters are all archaic,
  // there's no point in setting this without also setting complexArchaic.
  complexCho: true,
  // compute complex cho
  complexJung: true,
  // compute complex jung
  complexJong: true,
  // compute complex jong
  complexArchaic: false,
  // compute complex characters such as "ㅨ"
  composeComplexDouble: true,
  // allows composition of two of the same character
  // this means that things like "ㄲ" will be made
  decomposeComplexDouble: false,
  // allows composition of two of the same character
  // this means that things like "ㄲ" will turned into ['ㄱ', 'ㄱ']
  grouped: false,
  // only used when decomposing / disassembling something
  // produces a CharacterGroup instead of a string
};
export default (opts => (opts ? Object.assign({}, defaultOpts, opts) : defaultOpts));
