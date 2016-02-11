<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Subbreddit extends Model
{
    /** 
     * Get the user of the subbreddit.
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }
    
    /** 
     * Get the post for the subbreddit.
     */
    public function post()
    {
        return $this->hasMany('App\Post');
    }
    
      /** 
     * Get the subscribed users of the subbreddit.
     */
    public function subsrcibedUsers()
    {
        return $this->belongsToMany('App\User');
    }
}
