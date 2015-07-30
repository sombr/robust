package Robust::View::Template::index;
use Moo;
extends "Robust::View::Template";

use Types::Standard qw/:all/;

has classes => (
    is => "ro",
    isa => ArrayRef[HashRef],
    default => sub { [] }
);

1;
