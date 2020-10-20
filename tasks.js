/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name) {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  var arr = text.split(" ");

  if (text === 'quit\n' || text === 'exit\n') {
    quit();
  } else if (arr[0] === 'hello' || text === 'hello\n') {
    hello(text);
  } else if (arr[0] === 'help\n') {
    help();
  } else if (text === 'list\n') {
    list(tasks);
  } else if (arr[0] === 'add') {
    add(text, tasks);
  } else if (text === 'check\n') {
    error();
  } else if (arr[0] === 'check') {
    check(text,tasks);
  } else if (arr[0] === 'remove' || text === 'remove\n') {
    remove(text, tasks);
  } else if (arr[0] === 'edit') {
    edit(text, tasks);
  } else if (text === 'add\n' || text === 'edit\n') {
    error();
  } else {
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c) {
  console.log('unknown command: "' + c.trim() + '"')
}


/**
 * Says hello
 * @param  {string} t the text received
 * @returns {void}
 */
function hello(t) {

  if (t === 'hello\n') {
    console.log(t.replace('hello', 'hello!'))
  } else {
    console.log("\n" + t.trim() + "\n");
  }


}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit() {
  console.log('Quitting now, goodbye!')
  process.exit();
}


/**
 * "help", lists all the possible commands
 *
 * @returns {void}
 */
function help() {
  console.log("You can use these commands : \n\n",
    "hello --> start your first command you will get 'hello!'\n",
    "hello 'String'--> you will get 'hello string' \n",
    "exit / quit --> quit the application\n",
    "help --> for help lists all the possible commands \n",
    "list --> to lists all tasks \n",
    "add --> to add a task  for example (add workout)\n",
    "remove --> to remove your last task and remove 'number' to remove your chosen task \n")
}

/*
  --------static tasks----------
 */
let tasks = ['code', 'eat', 'lift', 'codeAgain', 'sleep'];

/*
  --------list function----------
 */
function list(arr) {
  console.log("\n");
  
  for (let i = 0; i < arr.length; i++) {
    if(arr[i].includes("[✓]")){
    console.log(arr[i]);}
    else{
      console.log(arr[i]+"[ ]");
    }
  }
  console.log("-------End of the list------");
}


/*
  --------add function----------
 */
function add(item, tasks) {
  var itemN = item.substr(4, item.length);
  //console.log("\nitemN: "+itemN);
  tasks.push(itemN.trim());
  console.log("\n----Task created successfully----\n'write list to list all your tasks' \n")
}
/*
  --------remove function----------
 */
function remove(item, tasks) {
  //console.log(item);
  var arr = item.split(" ");
  if (item === 'remove\n') {
    var task = tasks.pop()
    console.log("----" + task + " removed, check your list----\n");

  } else if (arr[1] > tasks.length) {
    console.log("your list has only " + (tasks.length) + " tasks");
    error();
  } else {
    task = tasks.splice(arr[1] - 1, 1);
    console.log("----item " + arr[1] + " removed, check your list---\n");
  }
}
/*
  --------edit function----------
 */

function edit(item, tasks) {
  var arr = item.split(" ");
  if (arr[0] === 'edit' && arr[1] < tasks.length) {
    var task = tasks.splice(arr[1] - 1, 1, arr[2]);
    console.log("----the task number " + arr[1] + " has changed, check you list----");
  } else {
    task = tasks.splice(tasks.length - 1, 1, arr[1]);
    console.log("----the last task has changed, check you list----");
  }

}
function check (item,tasks){
  //console.log(tasks[1]+"[✓]");
var arr=item.split(" ");
if ( arr[1]<tasks.length){
  var reserve=tasks[arr[1]-1];
  var task=tasks.splice(arr[1]-1,1,reserve+"[✓]");
 console.log("----some tasks are done, please check your list----");
}else{
  console.log(tasks[arr[1]]);
}



}
/*
  --------Error function----------
 */
function error() {
  console.log("\n----ERROR TRY AGAIN----\n");
}




// The following line starts the application
startApp("Elie Azar") 