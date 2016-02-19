<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class SubbredditsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return \App\Subbreddit::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $subbreddit = new \App\Subbreddit;
        $subbreddit->user_id = $request->user_id;
        $subbreddit->name = $request->name;
        $subbreddit->description = $request->description;
        $subbreddit->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return \App\Subbreddit::with(['post.comments.parentComment','user'])->find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function update(Request $request, $id)
    {
        $subbreddit = \App\Subbreddit::find($id);
        $subbreddit->user_id = $request->user_id;
        $subbreddit->name = $request->name;
        $subbreddit->description = $request->description;
        $subbreddit->save();
        
        return $subbreddit;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $subbreddit = \App\Subbreddit::find($id);
        $subbreddit->delete();
        return $subbreddit;
        
    }
}
