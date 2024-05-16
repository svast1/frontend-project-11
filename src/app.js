import validate from "./validate"; 
import fetchData from "./fetchData"; 
import _ from 'lodash';
import parser from './parser'
import showContent from "./showContent";
 
const state = { 
  list: [], 
  url: '', 
} 
 

export default function app() { 
  const form = document.querySelector('form') 
  const input = document.querySelector('#url-input') 
  form.addEventListener('submit', (e) => { 
    e.preventDefault() 
    const formData = new FormData(e.target) 
    const errorsContainer = document.querySelector('.feedback') 
    state.url = formData.get('url') 
    validate(state).then(content => { 
        if (!_.isEmpty(content)) { 
            errorsContainer.textContent = content.url.message 
            input.classList.add('is-invalid') 
        } else { 
            state.list.push(formData.get('url')) 
            errorsContainer.textContent = '' 
            input.classList.remove('is-invalid')
            fetchData(formData.get('url')).then(({ data }) => {
              showContent(parser(data.contents))
            })
        } 
    }) 
    form.reset() 
  }) 
}