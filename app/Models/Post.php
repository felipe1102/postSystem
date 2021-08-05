<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $table = "posts";

    protected $fillable =[
        "id_user",
        "title",
        "description"
    ];


    protected $with = ['user', "comments"];

    public function user() {
        return $this->belongsTo(User::class, 'id_user', 'id');
    }

    public function comments() {
        return $this->hasMany(Comment::class, 'id_post', 'id')->orderBy('id_user', 'desc');
    }
}
