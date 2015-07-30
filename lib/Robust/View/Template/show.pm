package Robust::View::Template::show;
use Moo;
extends "Robust::View::Template::index";

use Types::Standard qw/:all/;

has active_class => (
    is => "ro",
    default => 1
);

1;
