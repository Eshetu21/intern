<?php

namespace App\Http\Controllers;

use App\Http\Requests\TodoRequest;
use App\Models\Todo;
use Exception;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function fetchTodos()
    {
        try {
            $todos = Todo::all();
            if ($todos->count() == 0) {
                return response()->json(["message" => "No todos found"]);
            }
            return response()->json(["todos" => $todos], 200);
        } catch (Exception $e) {
            return response()->json(["error" => $e]);
        }
    }
    public function addTodo(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'todo_title' => 'required|string|max:255',
                'todo_description' => 'required|string',
                'todo_status' => 'nullable|boolean',
            ]);
            $todo = Todo::create($validatedData);

            return response()->json(['todo' => $todo]);
        } catch (Exception $e) {
            return response()->json([
                "errors" => $e->getMessage()
            ], 422);
        }
    }
    public function updateTodo(TodoRequest $request, $todoId)
    {
        $todo = Todo::where("id", $todoId)->first();
        if (!$todo) {
            return response()->json(["message" => "Todo list not found"], 404);
        }
        try {
            $validatedData = $request->validated();
            $todo->update($validatedData);
            return response()->json([
                "message" => "sucessfulFly updated",
                "todo" => $todo,
            ]);
        } catch (Exception $e) {
            return response()->json(["error" => $e]);
        }
    }
    public function deleteTodo($todoId)
    {
        $todo = Todo::where("id", $todoId)->first();
        try {
            $todo->delete();
            return response()->json([
                "message" => "sucessfully deleted",
            ]);
        } catch (Exception $e) {
            return response()->json(["error" => $e]);
        }
    }
}
