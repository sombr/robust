package Robust::Controller;
use Moo;

use Class::Load qw/ load_class /;

my @VIEWS = qw/ index /;

my %VIEWS = map {
    $_ => load_class("Robust::View::Template::$_")
} qw/ index show /;

sub render {
    my ($self, $name, @data) = @_;
    return [ 404, [], ["<html><head></head><body><h3>Not found</h3></body></html>"] ] unless $VIEWS{$name};

    [ 200, [], [$VIEWS{$name}->new(@data)->render] ];
}

1;
