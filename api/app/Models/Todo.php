<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    protected $fillable = [
        "todo_title",
        "todo_description",
        "todo_status"
    ];
}
