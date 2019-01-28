new Vue({
  el: '#app',
  data: {
    codes: codes,
  },
});
document.querySelectorAll('.code-container').forEach((codeContainer) => {
  codeContainer.addEventListener('click', codeClickedHandler);
});

function codeClickedHandler(event) {
  const codeContainer = this;
  navigator.permissions.query({
    name: "clipboard-write"
  }).then(result => {
    if (result.state == "granted" || result.state == "prompt") {
      const number = codeContainer.querySelector('.code-number').innerText;
      const content = codeContainer.querySelector('.code-content').innerText;
      const copyContent = `Article ${number}: ${content}`;
      navigator.clipboard.writeText(copyContent)
        .then(() => {
          toast(copyContent);
        }, () => {
          toast('Copy failed...!');
        });
    }
  });
}

function toast(text) {
  const snackbar = document.querySelector('#snackbar');
  snackbar.querySelector('.text').innerHTML = text;
  snackbar.classList.add('show');
  setTimeout(() => {
    snackbar.classList.remove('show');
  }, 3000);
}