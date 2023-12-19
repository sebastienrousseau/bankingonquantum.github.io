<!-- markdownlint-disable MD033 MD041 -->

<img
  align="right"
  alt="Logo of Banking On Quantum: Revolutionising the Financial Industry with Quantum Computing"
  height="261"
  src="https://kura.pro/bankingonquantum/images/logos/bankingonquantum.webp"
  width="261"
  />

<!-- markdownlint-enable MD033 MD041 -->

# bankingonquantum.com - Official Website 🌏

Welcome to the repository for [bankingonquantum.com][00], the digital presence of
Banking On Quantum, Revolutionising the Financial Industry with Quantum Computing

## Quick Start Guide

Setting up and running the website locally is easy and quick with the
[Shokunin Static Site Generator (SSG)][00].

### Prerequisites

Ensure you have the **Rust toolchain** installed. If not, follow the guide on
the [Rust website][01] to set it up.

### Installation & Usage

1. Install Shokunin SSG:

```shell
cargo install ssg
```

2. Clone the repository

```shell
git clone https://github.com/sebastienrousseau/bankingonquantum.github.io.git
```

3. Change into the repository directory:

```shell
cd bankingonquantum.github.io
```

4. Generate the static site for bankingonquantum.com:

```shell
ssg -n=docs -c=_posts -t=_layouts -o=output -s=public
```

[00]: https://bankingonquantum.com "Banking On Quantum Official Website"
[01]: https://www.rust-lang.org/learn/get-started "Rust Getting started guide"
