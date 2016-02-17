<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\User::class, 50)->create()->each(function($u) {
        $u->subbreddits()->save(factory(App\Subbreddit::class)->make());
            
        $u->posts()->save(factory(App\Post::class)->make([
               'subbreddit_id' => rand(1,App\Subbreddit::all()->count())
        ]));
            
        $u->comments()->save(factory(App\Comment::class)->make([
               'post_id' => rand(1,App\Subbreddit::all()->count())
        ]));
        
        $u->comments()->save(factory(App\Comment::class)->make([
               'comment_id' => rand(1,App\Subbreddit::all()->count())
        ]));
            
        $u->subscribedSubbreddits()->attach(rand(1,App\Subbreddit::all()->count()));
        });
    }
}
