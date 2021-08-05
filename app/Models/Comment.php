<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $table = "comments";

    protected $fillable = [
        "id_post",
        "id_user",
        "description"
    ];

    public function post() {
        return $this->belongsTo(Post::class, 'id_post', 'id');
    }

    public function user() {
        return $this->belongsTo(Post::class, 'id_user', 'id');
    }
}
