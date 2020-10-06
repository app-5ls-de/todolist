/* import { el, mount, text } from "redom"; */

var el = redom.el
var mount = redom.mount
var text = redom.text


function random_uuid() {
    function b(a) {
        return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b)
    } /* https://gist.github.com/jed/982883 */
    return b()
}

function random_id() {
    let length = 20
    let result = [],
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * characters.length)))
    }
    return result.join('')
}

var apiOrigin = "https://api.todo.app.5ls.de"

var state = {
    todos: {},
    id: "",
    key: "",
    sum: {
        all: 0,
        checked: 0
    },
    filter: {
        context: [],
        project: [],
        filter: []
    }
}


function setRemoteData(method, todo, id) {
    if (!state.key) {
        return
    }

    if (!['POST','PUT','DELETE'].includes(method)) return

    let url = apiOrigin + '/' + state.id

    if (['PUT','DELETE'].includes(method)) {
        if (id) {
            url += '/' + id
        } else {
            console.error("no id")
        }
    }
    
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type: "todo",
            todo: todo
        })
    }


    fetch(url, options)
        .then((response) => {
            if (response.ok) {
                return Promise.resolve(response)
            } else {
                return Promise.reject(new Error(response.statusText))
            }
        })
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            console.log(response)
            if (method =='POST') {
                addTodo(response.todo,response._id)
            }           
        
        })
        .catch((error) => {
            console.log('Request failed', error)
        })
}

function stripWhitespace(string) {
    return string.replace(/\s+/g, " ").trim()
}

function parse(string) {
    if (typeof string != "string") console.error("input isnt a string")
    string = stripWhitespace(string)
    if (string.length < 0) console.error("empty")
    let array = string.split(' ')

    let result = []
    let flags = {}


    
    function isPriority(string) {
        return string.length == 3 && /^\([A-Z]\)$/.test(string)
    }
    
    function isDate(string) {
        return string.length == 10 && /^\d{4}\-\d{2}\-\d{2}$/.test(string)
    }

    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (!flags.firstText) {
            if (i == 0 && element == "x") {
                result.push({checked:true})
                flags.checked = true
                continue
            }
            if ((i == 0 && !flags.checked) || (i == 1 && flags.checked)) {
                if (isPriority(element)) {
                    result.push({priority:element.split('')[1]})
                    flags.priority = true
                    continue
                }
            }

            if (!flags.date && isDate(element)) {
                if (i+1 < array.length && isDate(array[i+1])) {
                    result.push({completionDate:element})
                    result.push({creationDate:array[i+1]})
                    i++
                } else {
                    result.push({creationDate:element})
                }
                flags.date = true

                flags.firstText = true // creationDate is the last positional Parameter
                continue
            }
        }
        
        if (element.length>1) {
            let firstChar = element[0]
            if (firstChar == "+") {
                result.push({project:element.substring(1)})
                continue
            } else if (firstChar == "@") {
                result.push({context:element.substring(1)})
                continue
            }
        }

        if (element.length>=3) {
            let keyvalue = element.split(':')
            if (keyvalue.length == 2) {
                result.push({keyvalue:{key:keyvalue[0],value:keyvalue[1]}})
                continue
            }
        }

        result.push(element)

        if (!flags.firstText) flags.firstText = true
    }
    return result
}

function tostring(array) {
    let result = []
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (typeof element == "string") {
            result.push(element)
        } else {
            let type = Object.keys(element)[0]

            switch (type) {
                case "checked": result.push("x"); break;
                case "priority": result.push("("+element[type]+")"); break;
                case "completionDate": result.push(element[type]); break;
                case "creationDate": result.push(element[type]); break;
                case "project": result.push("+"+element[type]); break;
                case "context": result.push("@"+element[type]); break;
                case "keyvalue": result.push(element[type].key+":"+element[type].value);
              }
        }

        
    }
    return result.join(' ')
}

function createTodo(array,id) {
    let div_todo = el(".todo#"+id)
    let rawText = []
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (typeof element == "string") {
            rawText.push(element)
        } else {
            if (rawText.length) {
                mount(div_todo,el("span",rawText.join(' ')))
                div_todo.append(" ")
                rawText = []
            }

            let type = Object.keys(element)[0]

            switch (type) {
                case "checked":         mount(div_todo,el("span.x","x"));
                                        div_todo.classList.add("checked"); break;
                case "priority":        mount(div_todo,el("span.priority.punctuation","("));
                                        mount(div_todo,el("span.priority",element[type]));
                                        mount(div_todo,el("span.priority.punctuation",")")); break;
                case "completionDate":  mount(div_todo,el("span.date",element[type])); break;
                case "creationDate":    mount(div_todo,el("span.date",element[type])); break;
                case "project":         mount(div_todo,el("span.project.punctuation","+"));
                                        mount(div_todo,el("span.project",element[type])); break;
                case "context":         mount(div_todo,el("span.context.punctuation","@"));
                                        mount(div_todo,el("span.context",element[type])); break;
                case "keyvalue":        mount(div_todo,el("span.keyvalue.key",element[type].key));
                                        mount(div_todo,el("span.keyvalue.punctuation",":"));
                                        mount(div_todo,el("span.keyvalue.value",element[type].value));
              }
        }        
        div_todo.append(" ")
    }
    if (rawText.length) {
        mount(div_todo,el("span",rawText.join(' ')))
        div_todo.append(" ")
        rawText = []
    }
    
    div_todo.addEventListener('dblclick', function (e) {
        if (this.getAttribute("contenteditable")=="true") return
        this.classList.add("edit")
        // this.innerText = tostring(array)

        this.setAttribute("contenteditable", "true")
        this.focus()
        
        this.addEventListener('keydown',function (e) {
            if ((!e.shiftKey && e.key == "Enter") || e.key == "Escape") {
                this.blur()
                return false
            }
        })
        let newContent = ""

        this.addEventListener('input', function (e) {
            newContent = this.innerText
        })
    
        this.addEventListener('blur',function (e) {
            this.setAttribute("contenteditable", "false")
            this.classList.remove("edit")

            newContent = stripWhitespace(newContent)
            if (newContent){
                setRemoteData('PUT',newContent,id)

                addTodo(newContent,id)
                showTodos()
            } else {
                setRemoteData('DELETE',"",id)
                addTodo("",id)
            }
        })
    })
    return div_todo
}

function addTodo(todo,id) {
    if (!id) console.error("no id")
    if (todo) {
        state.todos[id] = {}
        state.todos[id].array = parse(todo)
        state.todos[id].el = createTodo(state.todos[id].array,id)
    } else {
        state.todos[id] = undefined
    }
}

function overlap(array1,array2) {
    return array1.some(r => array2.includes(r))
}

function showTodos() {
    state.sum.all = 0
    state.sum.checked = 0
    let filtered = []
    div_list.textContent = "" //remove all children
    div_list.append(div_newTodo)

    
//filter
    for (const id in state.todos) {
        if (state.todos.hasOwnProperty(id)) {
            const todo = state.todos[id]
            let projects = []
            let contexts = []
            let checked = false
            todo.array.forEach(element => {
                if (typeof element == "object") {
                    let type = Object.keys(element)[0]
                    if (type == "checked") checked = true
                    if (type == "project") projects.push(element[type])
                    if (type == "context") contexts.push(element[type])    
                }
            })

            let show = true
            if (state.filter.project.length && !overlap(state.filter.project,projects)) show = false
            if (state.filter.context.length && !overlap(state.filter.context,contexts)) show = false

            if (show) {
                filtered.push(id)
            }
        }
    }

//sort
    // alphabetically
   /*  filtered.sort((a,b) => {
        if (a is less than b by some ordering criterion) {
        return -1;
        }
        if (a is greater than b by the ordering criterion) {
        return 1;
        }
        // a must be equal to b
        return 0;

    }) */
    
//show
    filtered.forEach(id => {
        if (state.todos.hasOwnProperty(id)) {
            state.sum.all += 1   
            const todo = state.todos[id]
            mount(div_list,todo.el,div_newTodo)

            todo.array.forEach(element => {
                if (typeof element == "object") {
                    let type = Object.keys(element)[0]
                    if (type == "checked") state.sum.checked += 1             
                }
            })
        }
    })

    let contexts = new Set()
    let projects = new Set()
    for (const id in state.todos) {
        if (state.todos.hasOwnProperty(id)) {
            const todo = state.todos[id]
            todo.array.forEach(element => {
                if (typeof element == "object") {
                    let type = Object.keys(element)[0]
                    if (type == "project") projects.add(element[type])
                    if (type == "context") contexts.add(element[type])                
                }
            })
        }
    }

    document.getElementById("progresstext").innerText = state.sum.checked + "/" + state.sum.all
    document.getElementById("progressbar").style.width = state.sum.checked/state.sum.all * 100 + "%"

    let div_projects = document.getElementById("projects")
    div_projects.textContent = "" //remove all children
    projects.forEach(element => {
        let a = el("a.option",element)
        if (state.filter.project.includes(element)) {
            a.classList.add("selected")
        }
        a.addEventListener("click", (e) => {
            if (state.filter.project.includes(element)) {
                //a.classList.remove("selected")
                let index = state.filter.project.indexOf(element)
                state.filter.project.splice(index,1)
            } else {
                //a.classList.add("selected")
                state.filter.project.push(element)
            }
            showTodos()
        })
        mount(div_projects,a)
    })

    let div_contexts = document.getElementById("contexts")
    div_contexts.textContent = "" //remove all children
    contexts.forEach(element => {
        let a = el("a.option",element)
        if (state.filter.context.includes(element)) {
            a.classList.add("selected")
        }
        a.addEventListener("click", (e) => {
            if (state.filter.context.includes(element)) {
                //a.classList.remove("selected")
                let index = state.filter.context.indexOf(element)
                state.filter.context.splice(index,1)
            } else {
                //a.classList.add("selected")
                state.filter.context.push(element)
            }
            showTodos()
        })
        mount(div_contexts,a)
    })
    
}




var div_list = document.getElementById("todos")

const params = new URL(location.href).searchParams
state.id = params.get('id')

if (!state.id) {
    window.location.href = window.location.origin + "/?id=" + random_id() + "&pwd=" + random_uuid()
}

let key = params.get('pwd')
if (key) {
    state.key = key
    window.history.replaceState({}, document.title, "/?id=" + state.id)
    localStorage.setItem(state.id,key)
} else {
    if (localStorage.getItem(state.id)){
        state.key = localStorage.getItem(state.id)
    } else {
        state.key = ""
        localStorage.setItem(state.id,"")
    }
}


fetch(apiOrigin + '/' + state.id)
        .then((response) => {
            if (response.ok) {
                return Promise.resolve(response)
            } else {
                return Promise.reject(new Error(response.statusText))
            }
        })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].todo) {
                        addTodo(data[i].todo,data[i]._id)
                    }
                }
                showTodos()
            }
        })
        .catch((error) => {
            console.log('Request failed', error)
        })

var div_newTodo = document.getElementById("newTodo")
div_newTodo.addEventListener('keydown',function (e) {
    if (e.key == "Escape") {
        this.blur()
        return false
    }

    if (!e.shiftKey && e.key == "Enter") {
        newTodoHandler(this.innerText)
        setTimeout(function () { div_newTodo.innerText = "" },0)
        return false
    }
})

function newTodoHandler(text) {
    newContent = text.trim().split('\n')
    newContent.forEach(element => {
        row = stripWhitespace(element)
        if (row){
            setRemoteData('POST',row)
        }
    })
}

div_newTodo.addEventListener('blur',function (e) {
    newTodoHandler(this.innerText)
    this.innerText = ""
})


var div_lists = document.getElementById("lists")
for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
        const element = localStorage[key];
        mount(div_lists,el("a.option",{href: location.origin + "/?id=" + key, innerText: key}))
    }
}
