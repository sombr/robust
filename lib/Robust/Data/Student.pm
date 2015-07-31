package Robust::Data::Student;
use Moo;

use Types::Standard qw/:all/;

has name => (
    is => "ro",
    isa => Str,
    required => 1,
);

1;
