<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    protected $fillables = [
        "todo_title",
        "todo_description",
        "todo_status"
    ];
}
