function substitutePrefix(
  href = "https://www.steadylearner.com",
  set = ["s-", "https://"],
) {
  const substituteItOrNot = href.startsWith(set[0])
  if (substituteItOrNot) {
    return `${set[1]}${href.split(set[0])[1]}`;
  } else {
    return href;
  }
}

function substitutePrefixes(
  href = "https://www.steadylearner.com",
  set = [
    ["s-", "https://"],
  ],
) {
  const isHrefeIncludeAnyPrefix = set.filter(x => href.startsWith(x[0]));

  if(isHrefeIncludeAnyPrefix.length === 1) { // === i instead of > 0 to be more precise
    return `${isHrefeIncludeAnyPrefix[0][1]}${href.split(isHrefeIncludeAnyPrefix[0][0])[1]}`
  } else {
    return href;
  }
}

module.exports = {
  substitutePrefix,
  substitutePrefixes,
};
