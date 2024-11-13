<?php

use App\Http\Controllers\TodoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get("/test", function () {
    return response(["message" => "Api is working"]);
});

Route::get("/fetch", [TodoController::class, "fetchTodos"]);
Route::post("/add", [TodoController::class, "addTodo"]);
Route::put("/update/{id}", [TodoController::class, "updateTodo"]);
Route::delete("/delete", [TodoController::class, "deleteTodo"]);
