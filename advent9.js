const input = ``;

function clearIgnores(input) {
  let ignoring = false;
  return input.split('').reduce((acc, char) => {
    if (ignoring) {
      ignoring = false;  
    } else if (char == '!') {
      ignoring = true;
    } else {
      acc.push(char);
    }
    return acc;
  }, []).join('');
}

function clearGarbage(input) {
  let ignoring = false;
  return input.split('').reduce((acc, char) => {
    if (ignoring && char == '>') {
      ignoring = false;
      acc.push(char);
    } else if (!ignoring) {
      acc.push(char);
      if (char == '<') {
        ignoring = true;
      }
    }
    return acc;
  }, []).join('');
}

function parseGroupsSum(input) {
  let currLevel = 0;
  return input.split('').reduce((stack, char) => {
    if (char == '{') {
      currLevel++;
    } else if (char == '}') {
      stack[currLevel] = (stack[currLevel] || 0) + 1;
      currLevel--; 
    }
    return stack;
  }, []).reduce((sum, num, index) => sum += num * index, 0);
}
  
console.log(parseGroupsSum(clearGarbage(clearIgnores(input)).replace(/<>,?,/g,'')));
console.log(clearIgnores(input).length - clearGarbage(clearIgnores(input)).length);