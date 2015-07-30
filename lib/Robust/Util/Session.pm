package Robust::Util::Session;
use strict;
use warnings;

use feature qw/state/;

use Data::Dumper;
use Digest::SHA2;
use JSON;

use Time::HiRes qw/ time /;

use constant {
    INTERVAL => 60*60*3
};

my $json = JSON->new;
my $sha  = Digest::SHA2->new(256);

sub new {
    state $singleton //= bless {
        _sessions_ => {},
        _times_ => [],
    } => __PACKAGE__;
}

sub clear_old {
    my $self = shift;

    while ( @{ $self->{_times_} } && (time - $self->{_times_}->[0]->{ts}) > INTERVAL ) {
        delete $self->{_sessions_}->{ $self->{_times_}->[0]->{hash} };
        shift @{ $self->{_times_} };
    }
}

sub add_session {
    my ($self, %data) = @_;

    $sha->reset;
    $sha->add( Dumper(\%data) . time . $$ . rand(time) );

    my $hash = $sha->hexdigest;

    $self->{_sessions_}->{$hash} = \%data;
    push @{ $self->{_times_} }, { ts => time, hash => $hash };

    $self->clear_old;

    $hash;
}

sub get_session {
    my ($self, $hash) = @_;

    $self->clear_old;

    $self->{_sessions_}->{$hash};
}

1;
