# ConwayGame


### How to run:
- Download or clone the repo
- follow the given commands:
    ```sh
    $ cd ConwayGame
    $ docker-compose build
    $ docker-compose up
    ```
- now you can run each APIs from postman or any other api testing tool.


###### NOTE:
- '*' means alive cell
- '.' means dead cell


### APIs details:
###### API endpint: localhost
- Method: GET
- Response: Hellow Wrold!

###### API endpint: localhost/grids/test
- Method: GET
- Response: "msg": "grids route works"

###### API endpint: localhost/grids
- Method: POST
- Parameter: example
{
	"x": "2",
	"y": "2",
	"data": "*..*"
}
- Response: example
{
    "_id": "5d7e1c5b5c66040011afd92b",
    "x": 2,
    "y": 2,
    "data": "*..*",
    "__v": 0
}


###### API endpint: localhost/grids/:id
- Method: PATCH
- Parameter: example
{
	"x": "2",
	"y": "2",
	"data": "*..*"
}
- Response: example {"msg":"Updated successfully"}

###### API endpint: localhost/grids/:id
- Method: GET
- Response: example
{
    "_id": "5d7e1c5b5c66040011afd92b",
    "x": 3,
    "y": 3,
    "data": "***###***",
    "__v": 0
}

###### API endpint: localhost/grids/:id/after/age?1,2, 3
- Method: GET
- Response: example
{
    "id: <id>
    "x" : <size_of_x_axis>,
    "y" : <size_of_y_axis>,
    "data": [
        {
            "age": <age_1>
            "grid": <grid_representation_after_age_1_secs>
        },{
            "age": <age_2>
            "grid": <grid_representation_after_age_2_secs>
        },{
            "age": <age_3>
            "grid": <grid_representation_after_age_3_secs>
        }
    ]
}
