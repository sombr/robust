package Robust::Controller::Class;
use Moo;

extends "Robust::Controller";

sub index {
    my $self = shift;
    $self->render(index => {
        title => "Andrew I",
        classes => [
            { name => "Начинающие" },
            { name => "Advanced" }
        ],
        session => {},
    });
}

sub show {
    my $self = shift;
    $self->render(show => {
        title => "Andrew I",
        classes => [
            { name => "Начинающие", is_active => 1 },
            { name => "Advanced" }
        ],
        session => {},
    });
}

1;
