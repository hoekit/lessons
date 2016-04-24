#!/usr/bin/env perl
use strict;
use warnings;
use 5.10.0;
use List::Util qw/shuffle/;

my $str = 'the quick brown fox jumps over the lazy dog';

my $repeat = 5;
while ($repeat) {
    dictate( randomize($str) );
    $repeat--;
}


=head2 randomize( sentence )

DESCRIPTION

    Randomize the letters within a sentence

ARGUMENTS

    sentence - The sentence to be randomize

RETURN VALUES

    Randomized sentence

=cut
sub randomize {
    # 1. Split the string into chars
    # 2. Shuffle the chars
    # 3. Join the chars and return
    return join '', shuffle split //, shift;
}


=head2 randomAlphabet()

DESCRIPTION

    Generate a random sequence of the 26 alphabets

ARGUMENTS

    NONE

RETURN VALUES

    A 26 letter string
=cut
sub randomAlphabet {
    return join '', shuffle ' ',' ',' ',' ',' ',' ','a'..'z';
}


=head2 dictate( sequence [,pause] )

DESCRIPTION

    Dictates a sequence of alphabets with pauses between.

ARGUMENTS

    theString - Required. String. A string of alphabets to be read.

    pause - Optional. Int. Duration in seconds to pause between each
            alphabet. Default to 5 seconds.

RETURN VALUES

    NONE

=cut
sub dictate {
    my ($seq,$pause) = @_;
    $pause = $pause || 0;

    say 'Dictate: ' . $seq;
    foreach (split //, $seq) {
        dictateChar(lc $_) unless $_ eq ' ';
        sleep $pause;
    }
}

=head2 dictateChar( char )

DESCRIPTION

    Dictates a single alphabet

ARGUMENTS

    char - A single letter to be dictated.

RETURN VALUES

    NONE

=cut
sub dictateChar {
    system('play -q /home/hoekit/Desktop/Alphabets/audio/' . shift . '.mp3');
}



sub getLetters {
    foreach ('a'..'z') {
        my $cmd = "wget https://ssl.gstatic.com/dictionary/static/sounds/de/0/$_.mp3";
        system($cmd);
    }
}


