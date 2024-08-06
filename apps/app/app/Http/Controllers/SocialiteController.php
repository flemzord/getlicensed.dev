<?php

namespace App\Http\Controllers;

use App\Actions\Fortify\CreateNewUser;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    public function redirect(): \Symfony\Component\HttpFoundation\RedirectResponse|\Illuminate\Http\RedirectResponse
    {
        return Socialite::driver('google')
            ->redirect();
    }

    public function callback(): \Illuminate\Foundation\Application|\Illuminate\Routing\Redirector|\Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse
    {
        $social = Socialite::driver('google')->user();

        $check = User::where('google_id', $social->id)->first();
        if ($check) {
            Auth::login($check);

            return redirect('/');
        }

        $user = (new CreateNewUser)->create([
            'name' => $social->name,
            'email' => $social->email,
            'google_id' => $social->id,
            'token' => $social->token,
        ]);

        Auth::login($user);

        return redirect('/');
    }

    public function localOnly(): \Illuminate\Foundation\Application|\Illuminate\Routing\Redirector|\Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse
    {
        $user = User::find(1);
        Auth::login($user);

        return redirect('/');
    }
}
