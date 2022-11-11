/**
 * alerta.
 * Cria uma mensagem de alerta utilizando o Bootstrap 5
 * @param {string} mensagem - Mensagem de Alerta
 * @param {string} tipo - Tipo do Alerta (danger, success, warning ou primary)
 * @return {string} - Cria na div mensagemAlerta o elemento 
 */
function alerta(mensagem, tipo) {
    let mensagemAlerta = document.getElementById('mensagemAlerta')
    let wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + tipo + ' alert-dismissible m-3" role="alert">' + mensagem + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    mensagemAlerta.append(wrapper)
    //Auto Close após 3 segundos
    window.setTimeout(function () {
      wrapper.innerHTML = ''
    }, 3000);
  }