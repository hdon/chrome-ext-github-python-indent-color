console.log('github python indent color exten loaded');
const SELECTOR = '.type-python > .highlight > tbody > tr > td:nth-child(2)';
const TDs = document.querySelectorAll(SELECTOR);
const TEXT_NODE = 3;
function range(n) {
  const a = [];
  for (let i=0; i<n; i++)
    a.push(i);
  return a;
}
const NUM_COLORS = 4;
const COLORS = range(NUM_COLORS).map(n => (
  'hsl(' + (n/NUM_COLORS*360%360) + ',25%,95%)'
));
const COLORS2 = range(NUM_COLORS).map(n => (
  'hsl(' + (n/NUM_COLORS*360%360) + ',100%,95%)'
));
console.log('TDs.length=', TDs.length);
if (TDs.length) {
  var indentation = [0];
  TDs.forEach(td => {
    const tr = td.parentElement;
    const firstNode = td.childNodes[0];
    if (firstNode.nodeType == TEXT_NODE) {
      const match = firstNode.data.match(/^ */);
      if (match) {
        const last = indentation[indentation.length-1];
        const cur = match[0].length;
        if (cur > last) {
          indentation.push(cur);
          tr.style.borderTop = 'solid 1px ' + COLORS2[indentation.length % COLORS.length];
        } else if (cur < last) {
          while (indentation[indentation.length-1] > cur)
            indentation.pop();
          tr.style.borderTop = 'solid 1px ' + COLORS2[indentation.length % COLORS.length];
        }
      }
    }
    tr.style.backgroundColor = COLORS[indentation.length % COLORS.length];
    tr.setAttribute('data-indent-level', indentation.length);
  })
}
