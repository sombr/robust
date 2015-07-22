package Robust::Controller;
use Moo;

use Class::Load qw/ load_class /;

my @VIEWS = qw/ index /;

my %VIEWS = map {
    $_ => load_class("Robust::View::Template::$_")
} qw/ index 404 /;

sub render {
    my ($self, $name, @data) = @_;
    $name //= "404";

    [ 200, [], [$VIEWS{$name}->new(@data)->render] ];
}

1;
