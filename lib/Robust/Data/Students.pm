package Robust::Data::Students;
use strict;
use warnings;

use Ubic::Lockf;

my $DATADIR = $ENV{DATADIR} || "data";
my $FILENAME = "$DATADIR

my $students_by_name = {};
sub students_by_name {
    unless (%$students_by_name) {
        die "no such file: $DATADIR/students.json" unless -f "
    }
}

1;
