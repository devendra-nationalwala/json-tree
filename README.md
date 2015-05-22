# json-tree
json - tree create graphical navigation tree from json object. You can move child node to other parent by drag and drop.

# Usage
Provide array of node element as json. Each node is created by three attributes:<br/> 
1.<b>id</b>      : Unique identification for node <br/> 
2.<b>label </b>  : For displaying text on node<br/> 
3.<b>parent </b> : Id of parent node<br/> <br/> 
<b>Example:</b>

var jsonTreeObj = [<br/> 
                   {<br/> 
                        id: "administrator",<br/> 
                        label: "Administrator",<br/> 
                        parent: "#"<br/> 
                    },<br/> 
                    {<br/> 
                        id: "SalesTeam",<br/> 
                        label: "Sales Team",<br/> 
                        parent: "administrator"<br/> 
                    }<br/> 
                    ];<br/> 
                    
                    
                    
Once Json is created, call "createTree" method to generate tree. This jquery method has 2 attribute.

<b>jsonTreeObj</b> : to accept source json <br/>
<b>isDraggable</b> : If its value is true then you can drag child node to another parent. Default value is true. You can display static tree by keeping this attribute value false.<br/>

<b>Example:</b>

$(".treeViewer").createTree({<br/>
                    "jsonTreeObj": jsonTreeObj,<br/>
                    "isDraggable": true /*Optional (Default is true)*/<br/>
                });<br/>
