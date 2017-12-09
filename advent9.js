const input = ``;

// Remove all ! and immediate character after !
function clearIgnores(input) {
  let ignoring = false;
  return input.split('').reduce((acc, char) => {
    if (ignoring) ignoring = false;  
    else if (char == '!') ignoring = true;
    else acc.push(char);
    return acc;
  }, []).join('');
}

// Remove anything between any opening and closing < >; leave < >
function clearGarbage(input) {
  let ignoring = false;
  return input.split('').reduce((acc, char) => {
    if (ignoring && char == '>') {
      acc.push(char);
      ignoring = false;
    } else if (!ignoring) {
      acc.push(char);
      if (char == '<') ignoring = true;
    }
    return acc;
  }, []).join('');
}

// Parse groups of { }, track levels in stack array, and and increment counters in each level. Don't increment level if a comma (same level). Sum counters of each stack level.
function parseGroupsSum(input) {
  let currLevel = 0;
  return input.split('').reduce((stack, char) => {
    if (char == '{') currLevel++;
    else if (char == '}') {
      stack[currLevel] = (stack[currLevel] || 0) + 1;
      currLevel--; 
    }
    return stack;
  }, []).reduce((sum, num, index) => sum += num * index, 0);
}
  
console.log(parseGroupsSum(clearGarbage(clearIgnores(input)).replace(/<>,?,/g,'')));
console.log(clearIgnores(input).length - clearGarbage(clearIgnores(input)).length);