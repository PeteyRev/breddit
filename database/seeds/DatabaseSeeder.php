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
        $users = factory(App\User::class, 50)->create();
            
        $users->each(function($u) {
            $subbreddit = factory(App\Subbreddit::class)->make();
//            $subbreddit->user_id = $u->id;
//            $subbreddit->save();
            $u->subbreddits()->save($subbreddit);
            
            $post = factory(App\Post::class)->make();
            $post->subbreddit_id = rand(1,App\Subbreddit::all()->count());
            
            $u->posts()->save($post);

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
