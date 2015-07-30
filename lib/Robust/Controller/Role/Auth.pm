package Robust::Controller::Role::Auth;
use Moo::Role;

use Types::Standard qw/ :all /;

use constant {
    CLIENT_ID => "...",
    REDIRECT_URI => "http://52.28.16.79/login",
    DISPLAY => "popup",
};

has authorized => (
    is => "lazy",
    isa => Bool,
);
sub _build_authorized {
    my $self = shift;
}

1;
