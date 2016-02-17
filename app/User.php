<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
    
    /** 
     * Get the comments for the user.
     */
    public function comments()
    {
        return $this->hasMany('App\Comment');
    }
    
    /** 
     * Get the posts for the user.
     */
    public function posts()
    {
        return $this->hasMany('App\Post');
    }
    
    /** 
     * Get the subbreddits the user has created.
     */
    public function subbreddits()
    {
        return $this->hasMany('App\Subbreddit');
    }
    
    /** 
     * Get the subscribed subbreddits of the user.
     */
    public function subscribedSubbreddits()
    {
        return $this->belongsToMany('App\Subbreddit')->withTimestamps();
    }
    
}
