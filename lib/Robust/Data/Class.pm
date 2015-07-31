package Robust::Data::Class;
use Moo;

use Types::Standard qw/:all/;

use Digest::MD5 qw/md5_hex/;

use Robust::Data::Student;

has uid => (
    is => "lazy",
    isa => Str,
    default => sub {
        my $self = shift;

        md5_hex( $self->name . "|" . $self->start_date );
    }
);

has name => (
    is => "ro",
    isa => StrMatch[qr/.{3,}/],
    required => 1,
);

has start_date => (
    is => "ro",
    isa => StrMatch[qr/^\d{1,2}\.\d{1,2}\.\d{2,4}$/],
    required => 1,
);

has is_active_check => (
    is => "ro",
    isa => CodeRef,
    default => sub { sub {} }
);

has students => (
    is => "ro",
    isa => ArrayRef[InstanceOf["Robust::Data::Student"]],
    coerce => sub {
        my $val = shift;
        if ( $val && !ref $val ) {
            $val = Robust::Data::Students->get_by_name( $val );
        }

        $val
    },
    default => sub { [] }
);

sub is_active {
    my $self = shift;
    $self->is_active_check->();
}

sub to_hash {
    my $self = shift;

    {
        uid => $self->uid,
        name => $self->name,
        start_date => $self->start_date
    }
}

1;
