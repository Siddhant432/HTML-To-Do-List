createHTMLfromStorage()
        function showAddTaskModal(){
            $("#addTaskModal").modal('show')
        }
        function addTask(){
            $("#addTaskModal").modal('hide')
            var dataArr=($("#taskInputForm").serializeArray());
            var taskObject=new Object();
            var storageObjectArr=[]
            console.log(dataArr)
            var storageObject=localStorage.getItem('taskStorage')
            for(var i in dataArr){
                var name=dataArr[i]["name"]
                var value=dataArr[i]["value"]
                taskObject[name]=value;
            }
            console.log(taskObject)
            if(storageObject!=null && storageObject!=undefined && storageObject!=''){
                storageObjectArr=JSON.parse(storageObject)
                storageObjectArr.push(taskObject)
            }
            else{
                storageObjectArr.push(taskObject)
            }
            localStorage.setItem('taskStorage',JSON.stringify(storageObjectArr))
            console.log(storageObjectArr)
            createHTMLfromStorage()
            $("#taskInputForm").trigger('reset')
        }

        function createHTMLfromStorage(){
            var storageObjectArr=[];
            var storageObject=localStorage.getItem('taskStorage')
            var storageObjectArr=JSON.parse(storageObject)
            var html='';
            if(storageObject!=null && storageObject!=undefined && storageObject!=''){
                if(storageObjectArr && storageObjectArr.length>0){
                    for(let i in storageObjectArr){
                        var date=new Date(storageObjectArr[i]['Responsible']);
                        html=html+'<tr>'
                                +'<td>'+(parseInt(i)+1)+'</td>'
                                +'<td>'+storageObjectArr[i]['taskdescription']+'</td>'
                                +'<td>'+date.toDateString()+'</td>'
                                +'<td>'+ storageObjectArr[i]['ResponsiblePerson']+'</td>'
                                +'<td><i class="bi bi-check-circle-fill" onclick="markAsDone('+i+')"></i><i class="bi bi-pencil-square" onclick="editTask('+i+')"></i></td></tr>'
                    }
                }
                else{
                    html+='<tr><td colspan="5"> No task added yet</td></tr>'
                } 
            }
            $("#taskTableBody").html(html)
        }
        function markAsDone(index){
            alert("are u sure you finished this task?")
            var storageObjectArr=[];
            var storageObject=localStorage.getItem('taskStorage')
            if(storageObject!=null && storageObject!=undefined && storageObject!=''){
                storageObjectArr=JSON.parse(storageObject)
                storageObjectArr.splice(index,1)
            }
            localStorage.setItem('taskStorage',JSON.stringify(storageObjectArr))
            createHTMLfromStorage()
        }

        function editTask(index){
            var storageObjectArr=[];
            var storageObject=localStorage.getItem('taskStorage')
            if(storageObject!=null && storageObject!=undefined && storageObject!=''){
                storageObjectArr=JSON.parse(storageObject)
                $("#editTaskTextArea").val(storageObjectArr[index]['taskdescription'])
                $("#editTaskResponisblePerson").val(storageObjectArr[index]['ResponsiblePerson'])
                $("#editETA").val(storageObjectArr[index]['Responsible'])
                $("#editIndex").val(index)
                $("#updateTaskModal").modal('show')
            }
        }
        function updateTask(){
            $("#updateTaskModal").modal('hide')
            var dataArr=($("#taskupdateForm").serializeArray());
            var taskObject=new Object();
            var storageObjectArr=[]
            console.log(dataArr)
            var storageObject=localStorage.getItem('taskStorage')
            for(var i in dataArr){
                var name=dataArr[i]["name"]
                var value=dataArr[i]["value"]
                taskObject[name]=value;
            }
            console.log(taskObject)
            if(storageObject!=null && storageObject!=undefined && storageObject!=''){
                storageObjectArr=JSON.parse(storageObject)
                storageObjectArr[taskObject['taskIndex']]=taskObject
            }
            
            localStorage.setItem('taskStorage',JSON.stringify(storageObjectArr))
            console.log(storageObjectArr)
            createHTMLfromStorage()
        }