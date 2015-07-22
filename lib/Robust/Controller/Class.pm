package Robust::Controller::Class;
use Moo;

extends "Robust::Controller";

sub index {
    my $self = shift;
    $self->render(index => {
        title => "123"
    });
}

sub show {

}

1;
