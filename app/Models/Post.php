<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Post extends Model
{
    use HasFactory;

    protected $table = "posts";

    protected $fillable =[
        "id_user",
        "title",
        "description"
    ];


    protected $with = ['user', "comments", "loggedUserComments"];

    public function user() {
        return $this->belongsTo(User::class, 'id_user', 'id');
    }
    public function comments() {
        return $this->hasMany(Comment::class, 'id_post', 'id')->where("id_user", "!=", Auth::user()->id);
    }
    public function loggedUserComments() {
        return $this->hasMany(Comment::class, 'id_post', 'id')->where("id_user", Auth::user()->id);
    }
}
